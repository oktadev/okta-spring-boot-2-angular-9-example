package com.okta.developer.notes

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@SpringBootApplication
class DemoApplication

fun main(args: Array<String>) {
	runApplication<DemoApplication>(*args)
}

@Entity
data class Note(@Id @GeneratedValue var id: Long? = null,
				var title: String? = null,
				var text: String? = null,
				var user: String? = null)

@RepositoryRestResource
interface NotesRepository : JpaRepository<Note, Long> {
	fun findAllByUser(name: String): List<Note>
}

@RestController
class HomeController(val repository: NotesRepository) {

	@GetMapping("/")
	fun home(principal: Principal): List<Note> {
		println("Fetching notes for user: ${principal.name}")
		val notes = repository.findAllByUser(principal.name)
		if (notes.isEmpty()) {
			return listOf()
		} else {
			return notes
		}
	}
}
