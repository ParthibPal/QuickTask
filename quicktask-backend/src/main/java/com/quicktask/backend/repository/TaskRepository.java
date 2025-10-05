package com.quicktask.backend.repository;

import com.quicktask.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Inherits CRUD methods: findAll, findById, save, deleteById, etc.
}
