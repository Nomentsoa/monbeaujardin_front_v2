import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EtudiantList } from '../../../models/etudiant/etudiantList.model';
import { DateMbJ } from '../../../models/dateMBJ.model';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-modal-payer-ecolage',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, MatDatepickerModule, MatSuffix],
  templateUrl: './modal-payer-ecolage.component.html',
  styleUrl: './modal-payer-ecolage.component.scss',
})
export class ModalPayerEcolageComponent {
  @Output() close = new EventEmitter<void>();
  @Input() etudiantDetail!: EtudiantList;
  @Input() dateCourant!: DateMbJ;

  closePopup() {
    this.close.emit();
  }
}
