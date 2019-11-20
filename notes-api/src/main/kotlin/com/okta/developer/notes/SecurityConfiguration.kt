package com.okta.developer.notes

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@Configuration
class SecurityConfiguration : WebSecurityConfigurerAdapter() {
	override fun configure(http: HttpSecurity) {
		http
			.authorizeRequests().anyRequest().authenticated()
				.and()
			.oauth2Login()
				.and()
			.oauth2ResourceServer().jwt()
	}
}
