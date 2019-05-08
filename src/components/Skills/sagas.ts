import { createSagas } from 'utils/redux';
import {
  searchSkills, searchSkillsSuccess, searchsSkillFail, refreshSearchSkills, searchNextSkills, searchNextSkillsSuccess, searchsNextSkillFail
} from './actions';
import { call, put, delay } from 'redux-saga/effects';
import { skillService } from './services/skillService';
import { ISearchSKillRequest } from 'components/Skills/services/typings';
import { Action } from 'services/typings';

const searchSkillSaga = {
  on: [searchSkills, refreshSearchSkills],
  *worker(action: Action<ISearchSKillRequest>) {
    try {
      const res = yield call(skillService.searchSkill, action.payload);
      yield delay(1000);
      yield put(searchSkillsSuccess(res));
    } catch (err) {
      yield put(searchsSkillFail(err));
    }
  }
};

const searchNextSkillSaga = {
  on: searchNextSkills,
  *worker(action: Action<ISearchSKillRequest>) {
    try {
      const res = yield call(skillService.searchSkill, action.payload);
      yield delay(1000);
      yield put(searchNextSkillsSuccess(res));
    } catch (err) {
      yield put(searchsNextSkillFail(err));
    }
  }
};


export default createSagas([searchSkillSaga, searchNextSkillSaga]);
