import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

const httpModule = require("tns-core-modules/http");

const url = 'https://storageirtbr.blob.core.windows.net/manuals/games.json';

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    public game = {};
    public games  : Array<any> = [];


    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        httpModule.getJSON(url).then((r) => {
            this.games = r;
        }, (e) => {
            console.log(e)
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
