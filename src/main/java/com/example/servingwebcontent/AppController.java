package com.example.servingwebcontent;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AppController {
	
	@GetMapping("/products")
	public String listProducts() {
		return "productList";
	}

	
	@GetMapping("/products/{productId}")
	public String listProducts(@PathVariable long productId) {
		return "productDetail";
	}
	
	
	@GetMapping("/dashboard")
	public String showDashboard() {
		return "dashboard";
	}
	
	@GetMapping("/productManager")
	public String showProductsManager() {
		return "productManager";
	}
	
	@GetMapping("/test")
	public String test() {
		return "test";
	}
}
