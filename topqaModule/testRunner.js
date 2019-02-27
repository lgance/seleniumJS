const topqa = require('./autoManager');


var osqa;

var commonStatus = {
    "tableview":{
        statsu:true,
        testCase:[],
        actionfilter:{},
        run:async ()=>{
            try{
              await osqa.reset();
            //   await osqa.lnbOpen('Container',1);
            //   await osqa.lnbOpen('TableView',2);
            // await osqa.lnbOpen(['Container','TableView','테이블 이벤트 테스트']);
                await osqa.lnbOpen(["Container","TableView"]);
            }
            catch(err){
                console.error(err);
            }
        }
    },
    "button":{
        status:false,
        run:async()=>{
            console.log('Button Test Success');
        }
    },
    "regression":{
        status:false,
        run:async()=>{
                console.log('IMS Regression Automation Test Success');
            await osqa.gnbMenuSelect('topqa');
            // regression 재현코드가 있는 ListView를  순차적으로 클릭하여
            // 테스트 코드 진행 
            await osqa.regressionListViewIteratorClick();
           // iterator ListView 

        }
    },

    // Not Use 
       // reFactoring
       "tableview_2":{
        status:false,
        testCase:[],
        actionfilter:{},
        run:async () =>{
            try{
                const targetTableViewId = 'auto_tableview';
                osqa.reset();
                // set Located Table Page
                await osqa.gnbMenuSelect('automation');
                await osqa.lnbMenuSelect('Container');
                await osqa.subMenuSelect('TableView');

                // set Located Table Page
            if(await osqa.isDisplayDOM(targetTableViewId)){
                await osqa.tableViewHeaderClick(targetTableViewId);
                await osqa.tableViewRowClick(targetTableViewId);
                await osqa.tableViewRowDblClick(targetTableViewId);
            }

                /* 테스트 코드 factory 에 submit */
                await osqa.testSubmit();
            }
            catch(err){console.warn('tableview : Run Error');}
        }
    },

};
/**
 * @param {object} testContent
 * @public 
 */
exports.init = function(testContent){
        console.warn(this);
}
/**
 * @public
 */
exports.start = async function(){
    // driver initilalize
    try{
        osqa = new topqa();
        osqa.init();
        
        // totalTest Start based on commonStatus 
        let length = Object.keys(commonStatus).length;
        let commonStatusKeyArr = Object.keys(commonStatus);
        await commonStatusKeyArr.reduce(async(prev,curr,index,arr)=>{
                const nextItem = await prev;
                await run(curr);
                await osqa.userWait(1000);
        },Promise.resolve());

    }
    catch(err){console.log(err);}
}
/**
 * 
 * @param {string} widgetName Top.js Component Name
 * @private 
 */
async function run(widgetName){
        try{
    !!commonStatus[widgetName] ?
	(commonStatus[widgetName].status===false ?
            console.warn(`is ${widgetName} not test Set`) :
			await commonStatus[widgetName].run()) :
            console.warn(`is not Test Case ${widgetName}`);
    }
    catch(err){console.log(err);}
}
/**
 * E2E Test End Point
 * get testResult report and createJunitReport 
 */
exports.quit = async function(){
    try{
        if(!osqa){
           throw new Error('not yet Start');
           return; 
        }{  
            console.log('runner is Closed');
        //    await osqa.gnbMenuSelect('integration');
           // deprecated
           //await osqa.testReport();
        //    await osqa.createJunitReport();
           await osqa.quit();
        }
    }
    catch(err){
            console.log(err.message);
            console.dir(err);
    }
}

