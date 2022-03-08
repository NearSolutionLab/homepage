import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublishService {
  public popupMessage: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public changeNotice: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public subIsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  public currentUserChange: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public copingProgress: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public updateFrameNotes: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public clientResumed: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public aiTrackingObjects: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor() {}

  // popupMessage =  {targetId: string, parameters: any}
  pubPopupMessage(popupMessage) {
    this.popupMessage.next(popupMessage);
  }

  pubChangeNotice(data) {
    this.changeNotice.next(data);
  }
  isLoading(isLoading) {
    this.subIsLoading.next(isLoading);
  }

  pubCurrentUserChange(user) {
    this.currentUserChange.next(user);
  }

  pubCopingProgress(progressData) {
    this.copingProgress.next(progressData);
  }

  pubAITrackingObjects(aiTrackingObjectsData) {
    this.aiTrackingObjects.next(aiTrackingObjectsData);
  }

  pubUpdateFrameNotes(notesData) {
    this.updateFrameNotes.next(notesData);
  }

  private lastBreath: number = new Date().getTime();
  private keepBreathing() {
    setTimeout(() => {
      var now = new Date().getTime();
      if (this.lastBreath + 10000 * 2 < now) {
        this.clientResumed.next(new Date());
      }
      this.lastBreath = now;
      this.keepBreathing();
    }, 10000);
  }
  startBreathing() {
    if (!this.lastBreath) {
      this.keepBreathing();
    }
  }
}
