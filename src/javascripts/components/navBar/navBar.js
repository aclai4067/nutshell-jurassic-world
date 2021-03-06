import './navBar.scss';
import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';
import logo from './assets/logo.png';
import googleLogo from './assets/googleLogo.png';
import utilities from '../../helpers/utilities';
import dinosaurs from '../dinos/dinos';
import rides from '../rides/rides';
import vendors from '../vendors/vendors';
import equipment from '../equipment/equipment';
import allStaff from '../allStaff/allStaff';
import homepage from '../homepage/homepage';
import chaosLog from '../ChaosLog/chaosLog';
import schedule from '../schedule/schedule';


const backToHome = () => {
  homepage.buildHomepageCards();
};

const printLogo = () => {
  const domString = `<img src="${logo}" id="logoImg">`;
  utilities.printToDom('brandLogo', domString);
  $('body').on('click', '#logoImg', backToHome);
};

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const logoutEvent = () => {
  const logoutButton = $('#logOutButton');
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        $('cudButton').addClass('hide');
        $('#logInButton').removeClass('hide');
        logoutButton.addClass('hide');
      }).catch((error) => console.error(error));
  });
};

const printLoginButton = () => {
  const domString = `<button class="btn btn-dark" id="logInButton"><img src="${googleLogo}"> Login</button>`;
  utilities.printToDom('logButtons', domString);
  $('body').on('click', '#logInButton', signMeIn);
  $('body').on('click', '#dinoLink', dinosaurs.printDinos);
  $('body').on('click', '#ridesLink', rides.printRides);
  $('body').on('click', '#vendLink', vendors.showAllVendors);
  $('body').on('click', '#equipmentLink', equipment.printEquipment);
  $('body').on('click', '#scheduleLink', schedule.printOpenSchedule);
  $('body').on('click', '#staffLink', allStaff.buildAllStaff);
  $('body').on('click', '#chaosLog', chaosLog.printChaosLog);
};

export default {
  printLogo,
  printLoginButton,
  logoutEvent,
  backToHome,
};
