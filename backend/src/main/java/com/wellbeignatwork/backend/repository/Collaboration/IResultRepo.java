package com.wellbeignatwork.backend.repository.Collaboration;

import com.wellbeignatwork.backend.entity.Collaboration.Result;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IResultRepo extends CrudRepository<Result,Integer> {

    Object findAll(Sort totalCorrect);

    @Query(value = "select count(r.id) from Result r join r.sUser u join r.quiz q where u.id=:idu and q.idQuiz=:idq and r.status=false")
    Integer findUserQuiz(@Param("idu") Long idU,@Param("idq") Integer idQ);


    @Query(value = "select count(r.id) from Result r join r.sUser u where u.id=:idu")
    Integer getNbrQuiz(@Param("idu") Long idU);

    @Query(value = "select sum(r.totalCorrect) from Result r join r.sUser u where u.id=:idu group by r.sUser ")
    Integer getScore(@Param("idu") Long idU);

    @Query(value = "select r from Test f join f.quizzes q join q.results r join r.sUser u where u.id=:idu and f.idTest=:idf and r.status=false ")
    List<Result>  getResultByIdUserAndAndIdTest(@Param("idu") Long idU, @Param("idf") Integer idF);

}
