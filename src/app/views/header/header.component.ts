import {Component, Inject, OnInit} from '@angular/core';
import {DarkModeService} from "../../service/dark-mode.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showSettingsComponent: boolean = false

  constructor(@Inject(DOCUMENT) private document: Document,
              private readonly darkModeService: DarkModeService)
  {}

  ngOnInit(): void {
  }

  public onSettingsClick(): void {
    // this.showSettingsComponent = !this.showSettingsComponent
    this.document.body.classList.toggle('dark-theme')
    this.darkModeService.changeState()
  }

}
