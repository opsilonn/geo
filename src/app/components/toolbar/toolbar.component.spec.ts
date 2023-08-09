import { TestBed } from '@angular/core/testing';
import { AppModule } from 'app/app.module';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { MockBuilder } from 'ng-mocks';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;

  beforeEach(() => MockBuilder(ToolbarComponent, AppModule));

  beforeEach(() => {
    const fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
