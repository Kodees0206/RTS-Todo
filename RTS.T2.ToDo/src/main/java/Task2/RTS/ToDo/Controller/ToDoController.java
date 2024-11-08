package Task2.RTS.ToDo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Task2.RTS.ToDo.Model.ToDo;
import Task2.RTS.ToDo.Service.ToDoService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/todo")
public class ToDoController {

    @Autowired
    private ToDoService todoService;

    @GetMapping
    public ResponseEntity<List<ToDo>> getAllTodos() {
        List<ToDo> todos = todoService.showAll();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getTodoById(@PathVariable("id") Long id) {
        ToDo todo = todoService.getById(id);
        if (todo != null) {
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ToDo> createTodo(@RequestBody ToDo todo) {
        ToDo createdTodo = todoService.addOrUpdate(todo);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateToDo(@PathVariable("id") Long id, @RequestBody ToDo todo) {
        ToDo existingToDo = todoService.getById(id);
        if (existingToDo != null) {
            todo.setId(id);
            todoService.addOrUpdate(todo);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable("id") Long id) {
        ToDo todo = todoService.getById(id);
        if (todo != null) {
            todoService.delete(todo);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
