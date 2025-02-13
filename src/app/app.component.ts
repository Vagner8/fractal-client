import { Component, inject, OnInit } from '@angular/core';
import { SidenavComponent } from '@components/organisms';
import { HeaderComponent, SpinnerComponent } from '@components/atoms';
import { ToolbarComponent } from '@components/molecules';
import { DataService, EntitiesService } from '@services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ens = inject(EntitiesService);
  private ds = inject(DataService);

  ngOnInit(): void {
    this.ds.get().subscribe(dto => this.ens.init(dto));
  }
}
