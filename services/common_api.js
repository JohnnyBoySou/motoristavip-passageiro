import APICaller from './api_callers';
import config from "./../config";
import AsyncStorage from '@react-native-async-storage/async-storage';


 async function loginUser(email, password, callback) {
  var link = 'client/auth/gettoken';
  const data = {
    email: email,
    password: password
  };

  APICaller.publicAPI('POST', link, data, (response) => {
    callback(response)
  }, (error) => {
    console.log(error.request);
    alert(error);
  });
}
exports.loginUser = loginUser;

 async function registerUser(name, email, password, phone, callback) {
  const data = {
    name: name,
    email: email,
    password: password,
    phone: phone,
  };

  var link = 'client/auth/register';
  APICaller.publicAPI('POST', link, data, (response) => {
    callback(response)
  }, (error) => {
    console.log(error);
    alert(error)
  })

}
exports.registerUser = registerUser;



/**
 * Set setting
 */
async function setSettings() {
  APICaller.authAPI('GET', 'client/settings', {}, async (response) => {
    await AsyncStorage.setItem('settings', JSON.stringify(response));
  }, (error) => { alert(error) })
}

/**
 * getNotifications
 * @param {*} callback 
 */
exports.getNotifications = async (callback) => { APICaller.authAPI('GET', 'client/notifications', {}, callback, (error) => { alert(error) }) }

/**
 * Update orders status
 * @param {*} order_id 
 * @param {*} status_slug 
 * @param {*} comment 
 * @param {*} callback 
 */
exports.updateOrderStatus = async (order_id, status_slug, comment, callback) => {
  var statuses = {
    "just_created": "1",
    "accepted_by_admin": "2",
    "accepted_by_restaurant": "3",
    "assigned_to_driver": "4",
    "prepared": "5",
    "picked_up": "6",
    "delivered": "7",
    "rejected_by_admin": "8",
    "rejected_by_restaurant": "9",
    "updated": "10",
    "closed": "11",
    "rejected_by_driver": "12",
    "accepted_by_driver": "13"
  }
  var mode = config.DRIVER_APP ? "driver" : "vendor";
  APICaller.authAPI('GET', mode + '/orders/updateorderstatus/' + order_id + "/" + statuses[status_slug], { "comment": comment }, callback, (error) => { alert(error) })
};


exports.deactivateUser = async (callback, eCallback) => { APICaller.authAPI('GET', 'client/auth/deactivate', {}, callback, eCallback) };