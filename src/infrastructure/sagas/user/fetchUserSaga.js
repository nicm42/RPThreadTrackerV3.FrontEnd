import { take, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
	FETCH_USER,
	fetchedUserSuccess
} from '../../actions';

export default function* fetchUserSaga() {
	yield take(FETCH_USER);
	const response = yield call(axios.get, `${API_BASE_URL}api/user`);
	yield put(fetchedUserSuccess(response.data));
}
