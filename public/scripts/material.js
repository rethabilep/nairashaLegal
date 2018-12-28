import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCDrawer} from "@material/drawer";
import {MDCTabBar} from '@material/tab-bar';
import {MDCTabIndicator} from '@material/tab-indicator';
import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldIcon} from '@material/textfield/icon';

const startingPointIcon = new MDCTextFieldIcon(document.querySelector('#starting-point-icon'));
const destinationIcon = new MDCTextFieldIcon(document.querySelector('#destination-icon'));
const starting_point = new MDCTextField(document.querySelector('.starting-point'));
const destination = new MDCTextField(document.querySelector('.destination'));
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;
const tabIndicator = new MDCTabIndicator(document.querySelector('.mdc-tab-indicator'));
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

