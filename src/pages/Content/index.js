import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'webext-redux';
import $ from "jquery";

import App from './App';

const proxyStore = new Store();

const anchor = document.createElement('div');
anchor.id = 'anc';

document.body.insertBefore(anchor, document.body.childNodes[0]);

add_border()

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App/>
    </Provider>
   , document.getElementById('anc'));
});

export function add_border() {

    // console.log('add_border.');

    // var test = document.getElementsByTagName('body');
    // test.body.color = 'red';
    var div = document.createElement('div');
    div.className = 'hash1';
    div.innerText = "active";
    let link = document.createElement('a');
    div.style.display = 'none';
    // div.setAttribute('onclick', "location.href = ${img_url}");

    let dropup = '\
    <div class="dropup">\
      <button class="dropbtn">Dropup</button>\
      <div class="dropup-content">\
        <a id="link1" >add to folder</a>\
      </div>\
    </div>\
    '
    div.innerHTML = dropup;
    let body = document.getElementsByTagName('body');
    body[0].appendChild(div);

    var link_url =''
    var img_url = ''

    var pos = {x: 0, y: 0};


    $(document).ready(function () {
        $("img").mouseenter(function () {
            let x = $(this).offset().left;
            let y = $(this).offset().top;
            pos.x = x;
            pos.y = y;
            div.style.left = pos.x + 'px';
            div.style.top = pos.y + 'px';
            $(this).toggleClass('active');
            img_url = $(this).attr('src');
            link_url = 'http://'+ window.location.hostname;
            console.log(window.location.hostname, '\n');
            console.log(img_url, '\n img url')
            let closest_anchor = $(this).closest('a').attr('href');
            console.log(closest_anchor, '\n anchor')
            if(closest_anchor!==undefined) {
              link_url += closest_anchor;
            }
            if(closest_anchor !== undefined && closest_anchor.includes('http',0) ) {
              link_url = closest_anchor;
            }
            // document.getElementById('link1').setAttribute('href', link_url);
            // $('.hash1').toggle('block')
        });
        $("img").mouseleave(function () {
            let x = $(this).offset().left;
            let y = $(this).offset().top;
            pos.x = x;
            pos.y = y;
            $(this).toggleClass('active');
            // $('.hash1').toggle('block')
            // console.log(pos);
        });
    });
    $(document).keypress(function (e) {
        if (e.which == 100) {
          // console.log('hefo')
            // $('.active').remove(); // if d is pressed then remove active image
            $('.hash1').toggle();
        }
    });

    $('#link1').click(function(){
        let title = '';
        while(true) {
          let product = prompt("Please enter name");
          if(product==='') {
            alert('empty')
          }
          else if (product) {
              title = product
            break;
          }
          else{
            alert('cancelled')
            break;
          }
        }
        if(title!=='') {
          proxyStore.dispatch({
            type: 'ADD_COUNT',
          });
          console.log('this is executing')
          console.log(link_url)
          proxyStore.dispatch({
            type: 'INSERT_DATA',
            payload: {title: title, img_url: img_url, link_url: link_url}
          });
        }
    })
}