package com.example.taskflow.controller;

import com.example.taskflow.dto.CreateTaskRequest;
import com.example.taskflow.dto.UpdateTaskStatusRequest;
import com.example.taskflow.entity.Task;
import com.example.taskflow.service.TaskFlowService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskFlowService taskFlowService;

    public TaskController(TaskFlowService taskFlowService) {
        this.taskFlowService = taskFlowService;
    }

    @PostMapping
    public Task createTask(@Valid @RequestBody CreateTaskRequest request) {
        return taskFlowService.createTask(request);
    }

    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProject(@PathVariable Long projectId) {
        return taskFlowService.getTasksByProjectId(projectId);
    }

    @PatchMapping("/{taskId}/status")
    public Task updateTaskStatus(@PathVariable Long taskId,
                                 @Valid @RequestBody UpdateTaskStatusRequest request) {
        return taskFlowService.updateTaskStatus(taskId, request.getStatus());
    }
}
