package com.okta.developer.notes

import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component

@Component
class DataInitializer(val repository: NotesRepository) : ApplicationRunner {

    @Throws(Exception::class)
    override fun run(args: ApplicationArguments) {
        listOf("Note 1", "Note 2", "Note 3").forEach {
            repository.save(Note(title = it, user = "user"))
        }
        repository.findAll().forEach { println(it) }
    }
}
