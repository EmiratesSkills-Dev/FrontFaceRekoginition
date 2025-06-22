import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router, RouterModule } from '@angular/router';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzMessageModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzMessageModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  registerForm: FormGroup;
    photoFile: File | null = null;

    constructor(
      private fb: FormBuilder,
      private api: ApiService,
      private msg: NzMessageService,
      private router: Router
    ) {
      this.registerForm = this.fb.group({
        Name: ['', [Validators.required]]
      });
    }

    onFileChange(event: any) {
      this.photoFile = event.target.files[0] || null;
    }

    onSubmit() {
      if (!this.photoFile) return;
      const formData = new FormData();
      formData.append('Name', this.registerForm.value.Name);
      formData.append('Photo', this.photoFile);

      this.api.registerUser(formData).subscribe({
        next: () => {
          this.msg.success('Registration successful!');
          this.router.navigate(['/']);
        },
        error: err => {
          this.msg.error('Registration failed. Try again.');
        }
      });
  }
}
