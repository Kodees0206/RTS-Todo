package Task2.RTS.ToDo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import Task2.RTS.ToDo.Model.ToDo;


@Repository
public interface ToDoRepo extends JpaRepository<ToDo, Long>{

}
