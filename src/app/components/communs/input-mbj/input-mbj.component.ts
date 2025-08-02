import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-mbj',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-mbj.component.html',
  styleUrl: './input-mbj.component.scss',
})
export class InputMBJComponent {
  @Input() form!: FormGroup;
  @Input() formControlNameMBJ!: string;
  @Input() messageErreur!: string;
  @Input() label!: string;
  @Input() maxLength: number = 250;
}
