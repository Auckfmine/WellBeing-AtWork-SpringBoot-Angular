import { Component, OnInit } from "@angular/core";
import { QuizService } from "../../Service/quiz.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-view-quizzes",
  templateUrl: "./view-quizzes.component.html",
  styleUrls: ["./view-quizzes.component.scss"],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any[] = [];

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !", "Error in loading data !", "error");
      }
    );
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: "info",
      title: "Are you sure ?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete...

        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz["qId"] != qId);
            Swal.fire("Success", "Quiz deleted ", "success");
          },
          (error) => {
            Swal.fire("Error", "Error in deleting quiz", "error");
          }
        );
      }
    });
  }
}
