import React, {Key} from 'react';
import './Common.css';
import "react-datepicker/dist/react-datepicker.css"

import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';

import axios from 'axios';
import addDays from 'date-fns/addDays';

import Result from './Result';
import Loading from './Loading';

// exportして、`Resultコンポーネント` でもimportして使えるようにします
export type Plan = {
    plan_id: Key,
    image_url: string,
    course_name: string,
    duration: string,
    price: string,
    evaluation: string,
    prefecture: string,
    plan_name: string,
    caption: string,
    reserve_url_pc: string,
};

const Home = () => {
    const Today = new Date();

    // setDateで渡す引数の型をDate型だと明示的に書く。    
    const [date, setDate] = React.useState<Date>(Today);
    // budget Stateの初期値は 8000。setBudgetで渡す引数の型をnumber型だと明示的に書く。
    const [budget, setBudget] = React.useState<number>(8000);
    // departure Stateの初期値は1。setDepartureで渡す引数の型をnumber型だと明示的に書く。
    const [departure, setDeparture] = React.useState<number>(1);
    // duration Stateの初期値は60。setDurationで渡す引数の型をnumber型だと明示的に書く
    const [duration, setDuration] = React.useState<number>(60);

    // plans Stateを管理できるStateを初期化する。初期値は空の配列：[]。
    const [plans, setPlans] = React.useState<Plan[]>([]);

    const [plansCount, setPlansCount] = React.useState<number | undefined>(undefined);
    const [hasError, setHasError] = React.useState<boolean>(false); 
    const [loading, setLoading] = React.useState<boolean>(false);
    registerLocale('ja', ja);

    const onFormSubmit = async (event: { preventDefault: () => void; }) => {
        try {
            event.preventDefault();

            // API通信を実施している際はローディング処理を出す
            setLoading(true);

            // API通信実行
            const response = await axios.get('https://l1kwik11ne.execute-api.ap-northeast-1.amazonaws.com/production/golf-courses', {
                params: {date: addDays(date, 14), budget: '8000', depature: '東京駅', duration: '60分'}
            });
    
            // onFormSubmitが実行され、正常にAPIのレスポンスが返ってきたら、plans Stateに更新される。
            setPlans(response.data.plans);
            setPlansCount(response.data.plansCount);
            
            setLoading(false);

        } catch (e) {
            console.log(e);
            setHasError(true);
        }
    };

    return (
        <div className='ui container' id='container'>
            <div className='Search__Form'>                
                <form className='ui form segment' onSubmit={onFormSubmit}>

                    {/* プレー日程 */}
                    <div className='field'>
                        <label>
                            <i className='calendar alternate outline icon'></i>プレー日
                        </label>
                        <DatePicker
                        dateFormat="yyyy/MM/dd"
                        locale='ja'
                        selected={date}
                        minDate={Today}
                        onChange={selectedDate => {setDate(selectedDate || Today)}}
                        />
                    </div>

                    {/* 上限金額選択フォーム */}
                    <div className='field'>
                        <label>
                            <i className='yen sign icon'></i>上限金額
                        </label>
                        <select 
                        className='ui dropdown' 
                        name='dropdown'
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        >
                            <option value='8000'>8,000円</option>
                            <option value='12000'>12,000円</option>
                            <option value='16000'>16,000円</option>
                        </select>
                    </div>

                    {/* 場所 */}
                    <div className='field'>
                        <label>
                            <i className='map pin icon'></i>移動時間計算の出発地点（自宅から近い地点をお選びください）
                        </label>
                        <select 
                        className='ui dropdown' 
                        name='dropdown'
                        value={departure}
                        onChange={(e) => setDeparture(Number(e.target.value))}                        
                        >
                            <option value='1'>東京駅</option>
                            <option value='2'>横浜駅</option>                            
                        </select>
                    </div>

                    {/* 場所 */}
                    <div className='field'>
                        <label>
                            <i className='car icon'></i>車での移動時間上限
                        </label>
                        <select
                        className='ui dropdown' 
                        name='dropdown'
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        >
                            <option value='60'>60分</option>
                            <option value='90'>90分</option>
                            <option value='120'>120分</option>
                        </select>
                    </div>

                    {/* 検索実行ボタン */}
                    <div className='Search__Button'>
                        <button type='submit' className='Search__Button__Design'>
                            <i className='search icon'></i>ゴルフ場を検索する
                        </button> 
                    </div>
                </form>
                <Loading loading={loading}/>
                <Result plans={plans} plansCount={plansCount} error={hasError} />
            </div>
        </div>
    );
};

export default Home;
