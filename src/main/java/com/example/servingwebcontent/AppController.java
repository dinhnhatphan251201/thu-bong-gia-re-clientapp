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
	public String listProducts(@PathVariable(name = "name", required = false) Optional<String> name, Model model) {
		model.addAttribute("title", "Trang chủ");
		return "productList";
	}

	
	@GetMapping("/products/{productId}")
	public String listProducts(@PathVariable long productId, Model model) {
		model.addAttribute("title", "Thông tin sản phẩm " + productId);
		return "productDetail";
	}
	
	
	@GetMapping("/dashboard")
	public String showDashboard() {
		return "dashboard";
	}
	
	@GetMapping("/orderManager")
	public String showOrderManager(Model model) {
		model.addAttribute("title", "Quản lý hóa đơn");
		return "orderManager";
	}
	
	@GetMapping("/promotionManager")
	public String showPromotionManager(Model model) {
		model.addAttribute("title", "Quản lý mã giảm giá");
		return "promotionManager";
	}
	
	@GetMapping("/cart")
	public String showCart(Model model) {
		model.addAttribute("title", "Giỏ hàng");
		return "cart";
	}
	
	@GetMapping("/payment")
	public String showPayment(Model model) {
		model.addAttribute("title", "Đặt hàng");
		return "payment";
	}
	
	@GetMapping("/productManager")
	public String showProductsManager(Model model) {
		model.addAttribute("title", "Quản lý sản phẩm");
		return "productManager";
	}
	
	@GetMapping("/login")
	public String login(Model model) {
		model.addAttribute("title", "Đăng nhập");
		return "login";
	}
	
	
	@GetMapping("/test")
	public String test() {
		return "test";
	}
	
	
}
