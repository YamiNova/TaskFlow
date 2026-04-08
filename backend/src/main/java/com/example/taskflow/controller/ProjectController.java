package com.example.taskflow.controller;

import com.example.taskflow.dto.CreateProjectRequest;
import com.example.taskflow.entity.Project;
import com.example.taskflow.service.TaskFlowService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final TaskFlowService taskFlowService;

    public ProjectController(TaskFlowService taskFlowService) {
        this.taskFlowService = taskFlowService;
    }

    @PostMapping
    public Project createProject(@Valid @RequestBody CreateProjectRequest request) {
        return taskFlowService.createProject(request);
    }

    @GetMapping
    public List<Project> getProjects() {
        return taskFlowService.getAllProjects();
    }
}
