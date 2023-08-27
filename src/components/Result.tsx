import './Common.css';
import {Plan} from './Home';

type Props = {
    plans: Plan[];
    plansCount: number | undefined;
    error: boolean;
};

const Result: React.FC<Props> = ({plans, plansCount, error}) => {

    if (error) {
        return (
            <div className='wrapper'>
                <div className='ui negative message'>
                    <i className='close icon'></i>
                    <div className='header'>エラーが発生しました。</div>
                    検索条件を見直すか、管理者にお問い合わせください。
                    {error}
                </div>
            </div>
        );
    }

    if (plansCount == 0) {
        return (
            <div className='wrapper'>
                <div className='ui orange message'>
                    <div className='header'>
                    ゴルフ場が見つかりませんでした。条件を変更して再度検索してください。
                    </div>
                </div>
            </div>
        );
    }

    const result = plans.map((plan: Plan) => {
        return (
            <div className='item' key={plan.plan_id}>
                <div className='image'>
                    <img src={plan.image_url} alt={plan.course_name} />
                </div>
                <div className='content'>
                    <div className='meta'>
                        <span className='cinema'>{plan.course_name}</span>
                        <div className='ui mini statistics'>
                            {/* 車の移動時間 */}
                            <div className='statistic'>
                                <div className='value'>
                                    <i className='car icon'></i> {plan.duration + "分"}
                                </div>
                            </div>

                            {/* 値段 */}
                            <div className='statistic'>    
                                <div className='value'>
                                    <i className='yen sign icon'></i> {""}
                                    {plan.price.toLocaleString()}
                                </div>
                            </div>

                            {/* 評価 */}
                            <div className='statistic'>
                                <div className='value'>
                                    <i className='thumbs up outline icon'></i> {plan.evaluation}                                    
                                </div>
                            </div>
                        </div>
                        <div className='ui star rating' data-rating="3"></div>
                        
                        {/* 評価者の都道府県 */}
                        <div className='extra'>
                            <div className='ui label'>{plan.prefecture}</div>
                            <div className="ui label">{plan.plan_name}</div>
                        </div>
                    </div>

                    {/* ゴルフ場の情報 */}
                    <div className='description'>
                        <p>{plan.caption}</p>
                    </div>

                    {/* 予約ボタン */}
                    <div className='item-button'>
                        <a
                        href={plan.reserve_url_pc}
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        コースの予約はこちらから
                        </a>
                    </div>
                </div>
            </div>
        );
    });

    return <div>{result}</div>;
};

export default Result;