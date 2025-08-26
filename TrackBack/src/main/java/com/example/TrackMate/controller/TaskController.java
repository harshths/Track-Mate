package com.example.TrackMate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TrackMate.models.Task;
import com.example.TrackMate.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {
    
    @Autowired 
    private TaskService taskService;

    // api/tasks/add/{userId} // add a new task..
    @PostMapping("/add/{userId}")
    public Task addTask(@RequestBody Task task, @PathVariable Long userId){
        return taskService.addTask(task, userId);
    }

    // api/tasks/user/{userId} // get task of user..
    @GetMapping("/user/{userId}")
    public List<Task> getTasks(@PathVariable Long userId) {
        return taskService.getTaskByUserId(userId);
    }

    // api/tasks/update/{id} // update existing task..
    @PutMapping("/update/{taskId}")
    public Task updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        return taskService.updateTask(taskId, task);
    }

    // api/tasks/delete/{id}  // delete task..
    @DeleteMapping("/delete/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    } 
}
