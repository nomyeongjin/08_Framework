/* 개인 API 인증키 */

const serviceKey = "JzkABn6Wgy8ni//5iOg0eyjAcHsmqGe+tPRSk+OOBrcjMw6qPRWCGKrkeg7RxPdDht4HwRTU0hNNOpA8smp30Q==";


const getAirPollution = (sidoName) => {

    const requestUrl = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';

    // 쿼리 스트링 생성 (URLSearchParams.toString())

    const searchParams = new URLSearchParams();



    searchParams.append('serviceKey', serviceKey); // 서비스키 누락
    searchParams.append('returnType', 'JSON');
    searchParams.append('sidoName', sidoName);

    fetch(`${requestUrl}?${searchParams.toString()}`) // fetch 링크 작성 오류
    .then(resp => resp.json())
    .then(result => {

    console.log(result);

    })

    .catch(e => console.log(e));

}