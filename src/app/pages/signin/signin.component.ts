import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, NzModalModule],
  providers: [{ provide: NZ_ICONS, useValue: [ArrowLeftOutline] }],
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  processing = false;
  faceDetected = false;
  intervalId: any = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private modal: NzModalService
  ) {}

  async ngOnInit() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    this.startCamera();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    const video = this.videoElement?.nativeElement;
    if (video && video.srcObject) {
      (video.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  }

  async startCamera() {
    const video = this.videoElement.nativeElement;
    try {
      video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
      video.play();
      this.intervalId = setInterval(() => this.checkFace(), 500);
    } catch (err) {
      this.modal.error({
        nzTitle: 'Camera Error',
        nzContent: 'Unable to access the camera.',
        nzOnOk: () => this.goBack()
      });
    }
  }

  async checkFace() {
    if (this.processing) return;
    this.processing = true;
    const video = this.videoElement.nativeElement;
    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
    if (detection && !this.faceDetected) {
      this.faceDetected = true;
      clearInterval(this.intervalId);
      this.captureAndSend();
    }
    this.processing = false;
  }

  async captureAndSend() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob: Blob = await new Promise(resolve => canvas.toBlob(resolve as BlobCallback, 'image/png') as void);

    try {
      const user = await this.api.signInWithFace(blob).toPromise();
      this.router.navigate(['/dashboard'], { state: { user } });
    } catch (err: any) {
      this.modal.error({
        nzTitle: 'Recognition failed',
        nzContent: err?.error?.message || 'User not recognized. Please try again.',
        nzOnOk: () => this.goBack()
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
