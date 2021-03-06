import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEquipStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipStaff.json`)
    .then((response) => {
      const equipStaffArr = response.data;
      const equipStaff = [];
      if (equipStaffArr) {
        Object.keys(equipStaffArr).forEach((fbId) => {
          equipStaffArr[fbId].id = fbId;
          equipStaff.push(equipStaffArr[fbId]);
        });
      }
      resolve(equipStaff);
    })
    .catch((error) => reject(error));
});

const getEquipStaffbyStaffId = (staffId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipStaff.json`)
    .then((response) => {
      const equipStaffArr = response.data;
      const equipStaff = [];
      if (equipStaffArr) {
        Object.keys(equipStaffArr).forEach((fbId) => {
          equipStaffArr[fbId].id = fbId;
          equipStaff.push(equipStaffArr[fbId]);
        });
      }
      const filteredResult = equipStaff.filter((x) => x.staffId === staffId);
      resolve(filteredResult);
    })
    .catch((error) => reject(error));
});

const removeEquipStaff = (equipStaffId) => axios.delete(`${baseUrl}/equipStaff/${equipStaffId}.json`);

const createEquipStaff = (newEquipStaff) => axios.post(`${baseUrl}/equipStaff.json`, newEquipStaff);

const findEquipStaffByEquipId = (equipId) => new Promise((resolve, reject) => axios.get(`${baseUrl}/equipStaff.json?orderBy="equipmentId"&equalTo="${equipId}"`)
  .then((response) => resolve(Object.keys(response.data)[0])).catch((err) => reject(err)));

export default {
  getEquipStaff,
  removeEquipStaff,
  createEquipStaff,
  findEquipStaffByEquipId,
  getEquipStaffbyStaffId,
};
