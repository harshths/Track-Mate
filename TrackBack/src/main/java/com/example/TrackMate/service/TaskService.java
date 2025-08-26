package com.example.TrackMate.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TrackMate.models.Task;
import com.example.TrackMate.models.User;
import com.example.TrackMate.repo.TaskRepo;
import com.example.TrackMate.repo.UserRepo;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private UserRepo userRepo;

    public Task addTask(Task task, Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            task.setUser(user);
            return taskRepo.save(task);
        }

        return null;
    }

    public List<Task> getTaskByUserId(Long userid) {
        User user = userRepo.findById(userid).orElse(null);
        if (user != null) {
            return taskRepo.findByUser(user);
        }
        return null;
    }

    public Task updateTask(Long taskId, Task updatedTask) {
        Task existingTask = taskRepo.findById(taskId).orElse(null);

        if (existingTask != null) {
            boolean wasPending = existingTask.getStatus().equalsIgnoreCase("Pending");

            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setTargetDate(updatedTask.getTargetDate());
            existingTask.setStatus(updatedTask.getStatus());

            // If task changed from Pending → Completed
            if (wasPending && updatedTask.getStatus().equalsIgnoreCase("Completed")) {
                existingTask.setCompletionDate(LocalDate.now());

                LocalDate targetDate = existingTask.getTargetDate();
                LocalDate completedDate = LocalDate.now();

                if (targetDate != null) {
                    User user = existingTask.getUser();

                    if (!completedDate.isAfter(targetDate)) {
                        // Completed on or before time
                        user.setCoins(user.getCoins() + 100);
                    } else {
                        // Late completed
                        user.setCoins(user.getCoins() - 50);
                    }

                    userRepo.save(user);
                }
            }

            return taskRepo.save(existingTask);
        }

        return null;
    }

    public void deleteTask(Long taskId) {
        taskRepo.deleteById(taskId);
    }
}
