package com.wellbeignatwork.backend.controller.Collaboration;


import com.wellbeignatwork.backend.entity.Collaboration.Collaboration;
import com.wellbeignatwork.backend.service.Collaboration.ICollaborationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/Collaboration")
public class CollaborationController {
	@Autowired
	ICollaborationService collaborationService;

	//http://localhost:8081/Wellbeignatwork/Collaboration/addCollaboration
	@PostMapping("/addCollaboration")
	@ResponseBody
	public Collaboration addCollaboration(@RequestBody Collaboration c){
		return collaborationService.addCollaboration(c);
	}

	//http://localhost:8081/Wellbeignatwork/Collaboration/UpdateCollaboration/1
	@PutMapping("/UpdateCollaboration/{id}")
	@ResponseBody
	public void UpdateCollaboration(@RequestBody Collaboration c, @PathVariable long idUser)
	{
		collaborationService.updateCollaboration(c,idUser);
	}

	//http://localhost:8081/Wellbeignatwork/Collaboration/deleteCollaboration/1
	@DeleteMapping("/deleteCollaboration/{id}")
	@ResponseBody
	public void deleteCollaboration(@PathVariable Long id){
		collaborationService.deleteCollaboration(id);
	}

	//http://localhost:8081/Wellbeignatwork/Collaboration/retrieveAllCollaborations
	@GetMapping("/retrieveAllCollaborations")
	@ResponseBody
	public List<Collaboration> retrieveAllCollaborations() {

		return collaborationService.retrieveAllCollaborations();
	}


	//http://localhost:8081/Wellbeignatwork/Collaboration/retrieveCollaboration/2
	@GetMapping("/retrieveCollaboration/{id}")
	@ResponseBody
	public Collaboration retrieveCollaboration(@PathVariable Long id){
		return collaborationService.retrieveCollaboration(id);
	}
}
