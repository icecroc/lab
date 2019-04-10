import {AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {MaterialService} from '../../classes/material.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit  {

    links = []
  
   /*
    {url: '/history', name: 'Архив'},
    {url: '/closed', name: 'Закрытые заявки'},
    {url: '/answer', name: 'Открытые заявки'},
    {url: '/order', name: 'Добавить заявку'},
    {url: '/order/5c905f8f3eb78205a60e02fa', name: 'Масло'},
    {url: '/order/5c9060c03eb78205a60e030f', name: 'Смазки'},
    {url: '/categories', name: 'Шаблоны'}
  ] */

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit () {
    const perms = localStorage.getItem("perms")
    console.log(perms)

    if (perms) {
      switch (perms) {
        case '1': {
          this.links = [
            {url: '/history', name: 'Архив'},
            {url: '/order', name: 'Добавить заявку'},
            //{url: '/order/5c905f8f3eb78205a60e02fa', name: 'Масло'},
            //{url: '/order/5c9060c03eb78205a60e030f', name: 'Смазки'}
          ]
          console.log(this.links)
          break;
        }
        case '2': {
          this.links = [
            {url: '/history', name: 'Архив'},
            {url: '/closed', name: 'Закрытые заявки'},
            {url: '/answer', name: 'Открытые заявки'}
          ]
          console.log(this.links)
          break;
        }
        case '3': {
          this.links = [
            {url: '/history', name: 'Архив'},
            {url: '/closed', name: 'Закрытые заявки'},
            {url: '/answer', name: 'Открытые заявки'},
            {url: '/order', name: 'Добавить заявку'},
            {url: '/order/5c905f8f3eb78205a60e02fa', name: 'Масло'},
            {url: '/order/5c9060c03eb78205a60e030f', name: 'Смазки'},
            {url: '/categories', name: 'Шаблоны'}
          ]
          console.log(this.links)
          break;
        }
        case '4': {
          this.links = [
            {url: '/history', name: 'Архив'},
            {url: '/closed', name: 'Закрытые заявки'},
            {url: '/answer', name: 'Открытые заявки'},
            {url: '/order', name: 'Добавить заявку'},
            {url: '/order/5c905f8f3eb78205a60e02fa', name: 'Масло'},
            {url: '/order/5c9060c03eb78205a60e030f', name: 'Смазки'},
            {url: '/categories', name: 'Шаблоны'}
          ]
          console.log(this.links)
          break;
        }
      }
    }
  }
 

  

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
