package com.example.servingwebcontent;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AppController {
	
	@GetMapping("/products")
	public String listProducts(@PathVariable(name = "name", required = false) Optional<String> name) {
		
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
	
	@GetMapping("/orderManager")
	public String showOrderManager() {
		return "orderManager";
	}
	
	@GetMapping("/promotionManager")
	public String showPromotionManager() {
		return "promotionManager";
	}
	
	@GetMapping("/cart")
	public String showCart() {
		return "cart";
	}
	
	@GetMapping("/payment")
	public String showPayment() {
		return "payment";
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
