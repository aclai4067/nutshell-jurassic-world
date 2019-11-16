import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import './allStaff.scss';
import staffData from '../../helpers/data/staffData';
import utilities from '../../helpers/utilities';

const staffModeToggle = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    $('.hireButton').removeClass('hide');
    $('.fire').removeClass('hide');
    $('.updateRole').removeClass('hide');
  } else {
    $('.hireButton').addClass('hide');
    $('.fire').addClass('hide');
    $('.updateRole').addClass('hide');
  }
};

const fireStaff = (e) => {
  e.preventDefault();
  const staffId = e.target.id.split('fire-')[1];
  staffData.fireStaff(staffId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildAllStaff();
    })
    .catch((error) => console.error(error));
};

const hireStaff = (e) => {

}

const buildAllStaff = () => {
  $('#dinosaurs').addClass('hide');
  $('#rides').addClass('hide');
  $('#vendors').addClass('hide');
  $('#home-page').addClass('hide');
  $('#staff').removeClass('hide');
  staffData.getStaff()
    .then((allStaff) => {
      let domString = '<button href="#" class="btn btn-outline-success hireButton" id="hire">Hire</button>';
      domString += '<div id="staffSection" class="d-flex flex-wrap">';
      allStaff.forEach((staff) => {
        domString += `
        <div class="card col-4 d-flex" id="${staff.id}">
          <img src="${staff.img}" class="card-img-top staffImg img-responsive" alt="...">
            <div class="card-body">
              <h5 class="card-title">${staff.name}</h5>
              <p class="card-text">${staff.role}</p>
                <div class="d-flex justify-content-between">
                  <button href="#" class="btn btn-outline-danger fire hide" id="fire-${staff.id}">Fire</button>
                  <button href="#" class="btn btn-outline-secondary updateRole hide">Update Role</button>
                </div>
            </div>
        </div>
        `;
      });
      domString += '</div>';
      utilities.printToDom('staff', domString);
      staffModeToggle();
      $('.fire').click(fireStaff);
    })
    .catch((error) => console.error(error));
};

export default { buildAllStaff, staffModeToggle };
