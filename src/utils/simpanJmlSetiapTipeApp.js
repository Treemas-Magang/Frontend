/* eslint-disable prettier/prettier */
import axios from 'axios';
import {API_GABUNGAN} from '@env';
import {setNotiveMasingMasingApproval} from '../redux';

async function setDataJmlNotifMasingMasingApproval(dispatch, headers) {
  try {
    const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    const response = await axios.get(apiUrlNotifApproval, {headers});

    const liburApprovals = response.data.data.liburApprovals;
    const liburCount = liburApprovals.filter(
      item => item.isLibur === '1',
    ).length;
    const lemburCount = liburApprovals.filter(
      item => item.isLembur === '1',
    ).length;
    dispatch(setNotiveMasingMasingApproval('libur', liburCount));
    dispatch(setNotiveMasingMasingApproval('lembur', lemburCount));
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }

  try {
    const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    const response = await axios.get(apiUrlNotifApproval, {headers});

    const absenPulangApprovals = response.data.data.absenPulangApprovals;
    const absenPulangApprovalsCount = absenPulangApprovals.length;
    dispatch(
      setNotiveMasingMasingApproval('absen_pulang', absenPulangApprovalsCount),
    );
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }

  try {
    const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    const response = await axios.get(apiUrlNotifApproval, {headers});

    const cutiApprovalWebs = response.data.data.cutiApprovalWebs;
    const cutiApprovalWebsCount = cutiApprovalWebs.length;
    dispatch(setNotiveMasingMasingApproval('cuti_web', cutiApprovalWebsCount));
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }

  try {
    const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    const response = await axios.get(apiUrlNotifApproval, {headers});

    const reimburseApprovals = response.data.data.reimburseApprovals;
    const reimburseApprovalsCount = reimburseApprovals.length;
    dispatch(setNotiveMasingMasingApproval('reimburse', reimburseApprovalsCount));
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }

  try {
    const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    const response = await axios.get(apiUrlNotifApproval, {headers});

    const absenWebApprovals = response.data.data.absenWebApprovals;
    const absenWebApprovalsCount = absenWebApprovals.length;
    dispatch(
      setNotiveMasingMasingApproval('absen_web', absenWebApprovalsCount),
    );
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }

  try {
    const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    const response = await axios.get(apiUrlNotifApproval, {headers});

    const absenWebApprovals = response.data;
    const absenWebApprovalsCount = absenWebApprovals.length;
    dispatch(
      setNotiveMasingMasingApproval('absen_web', absenWebApprovalsCount),
    );
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }

  try {
    const apiUrlNotifApproval = `${API_GABUNGAN}/api/notif/get-all-approval`;
    const response = await axios.get(apiUrlNotifApproval, {headers});

    const cutiApprovals = response.data.data.cutiApprovals;
    const cutiCount = cutiApprovals.filter(
      item => item.flgKet === 'cuti',
    ).length;
    const sakitCount = cutiApprovals.filter(
      item => item.flgKet === 'sakit',
    ).length;
    dispatch(setNotiveMasingMasingApproval('cuti', cutiCount));
    dispatch(setNotiveMasingMasingApproval('sakit', sakitCount));
  } catch (error) {
    console.error('Error fetching data:', error.response);
  }
}

export default setDataJmlNotifMasingMasingApproval;
