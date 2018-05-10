package com.tivo.gesture.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tivo.gesture.controller.model.GestureInput;
import com.tivo.gesture.controller.model.Response;
import com.tivo.gesture.service.GestureService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/server")
@Api(value = "gesture controller", description = "Operations to respond to the gesture patterns input ")
public class GestureController {
	private GestureService gestureService;
	Logger log = LoggerFactory.getLogger(GestureController.class);

	@Autowired
	public void setProductService(GestureService productService) {
		this.gestureService = productService;
	}

	@ApiOperation(value = "Sample first API ", response = Response.class)
	@RequestMapping(value = "/first", method = RequestMethod.GET)
	public Response getResponse(GestureInput model) {
		Response resp = gestureService.getResponse(model);
		return resp;
	}

	@ApiOperation(value = "Change channel", response = Response.class)
	@RequestMapping(value = "/changechannel", method = RequestMethod.POST)
	@CrossOrigin(origins="*")
	public Response changechannel(@RequestBody GestureInput product) {
		log.info("/changechannel " + product.toString());
		Response changechannel = gestureService.changechannel(product);
		return changechannel;
	}

	// @RequestMapping(value = "/show/{id}", method= RequestMethod.GET)
	// public Product showProduct(@PathVariable Integer id, Model model){
	// Product product = productService.getProductById(id);
	// return product;
	// }
	// @RequestMapping(value = "/add", method = RequestMethod.POST)
	// public ResponseEntity saveProduct(@RequestBody Product product){
	// productService.saveProduct(product);
	// return new ResponseEntity("Product saved successfully", HttpStatus.OK);
	// }
	// @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	// public ResponseEntity updateProduct(@PathVariable Integer id, @RequestBody
	// Product product){
	// Product storedProduct = productService.getProductById(id);
	// storedProduct.setDescription(product.getDescription());
	// storedProduct.setImageUrl(product.getImageUrl());
	// storedProduct.setPrice(product.getPrice());
	// productService.saveProduct(storedProduct);
	// return new ResponseEntity("Product updated successfully", HttpStatus.OK);
	// }
	// @RequestMapping(value="/delete/{id}", method = RequestMethod.DELETE)
	// public ResponseEntity delete(@PathVariable Integer id){
	// productService.deleteProduct(id);
	// return new ResponseEntity("Product deleted successfully", HttpStatus.OK);
	// }
}
