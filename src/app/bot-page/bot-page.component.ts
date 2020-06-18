import { Component, OnInit } from '@angular/core';
import { BotsService } from '../bots/bots.service';
import { SEOService } from '../services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bot-page',
  templateUrl: './bot-page.component.html',
  styleUrls: ['./bot-page.component.css']
})
export class BotPageComponent implements OnInit {
  bot: any;
  user: any;

  get id() { return this.route.snapshot.paramMap.get('id') }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SEOService,
    private service: BotsService) {}

  async ngOnInit() {
    await this.service.init();

    this.user = this.service.getBot(this.id);
    this.bot = this.service.getSavedBot(this.id);
    if (!this.user || !this.bot)
      return this.router.navigate(['']);

    this.seo.setTags({
      description: this.bot.listing.overview,
      titleSuffix: this.user.username,
      url: `bots/${this.id}`
    });
  }
}