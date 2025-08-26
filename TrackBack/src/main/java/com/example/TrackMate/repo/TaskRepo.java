package com.example.TrackMate.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TrackMate.models.Task;
import com.example.TrackMate.models.User;

import java.util.List;


public interface TaskRepo extends JpaRepository<Task, Long>{
    List<Task> findByUser(User user);
}
