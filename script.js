/*Константы */
const workers = [""];
const hospitals = [""];
const instruments = [];
const instruments2 = [""];

function burgerMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*Отрисовска при загрузке */
function getFacilities() {
    const url = `https://docs.google.com/spreadsheets/d/16ABEN54Ykbej-PhrbBjGlaHSXzNbD4PA8ecbpWc5QHQ/gviz/tq?gid=178416067`;
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const data2 = JSON.parse(rep.substr(47).slice(0,-2));
        const length = data2.table.rows.length;
        for (let i=1; i<length; i+=1) {
            if(data2.table.rows[i].c[0] && data2.table.rows[i].c[0].v != null) hospitals.push(data2.table.rows[i].c[0].v)
            if(data2.table.rows[i].c[2] && data2.table.rows[i].c[2].v != null) workers.push(data2.table.rows[i].c[2].v);
            if(data2.table.rows[i].c[1] && data2.table.rows[i].c[1].v != null) instruments.push(data2.table.rows[i].c[1].v);
            if(data2.table.rows[i].c[1] && data2.table.rows[i].c[1].v != null) instruments2.push(data2.table.rows[i].c[1].v);
        }
    })
    .then(rep => {
        const application = document.createElement('select');
        application.className = 'select';
        application.id = 'application';
        document.getElementById('select_application').appendChild(application);
        for (let i=0; i<workers.length; i+=1) {
            let option = document.createElement('option');
            option.value = workers[i];
            option.text = workers[i];
            application.appendChild(option);
        }
        const application2 = document.createElement('select');
        application2.className = 'select';
        application2.id = 'application2';
        document.getElementById('select_application2').appendChild(application2);
        for (let i=0; i<workers.length; i+=1) {
            let option = document.createElement('option');
            option.value = workers[i];
            option.text = workers[i];
            application2.appendChild(option);
        }
        document.getElementById('application2').addEventListener('change',getListVisits);
        const facilities = document.createElement('select');
        facilities.className = 'select';
        facilities.id = 'facility';
        document.getElementById('select_facility').appendChild(facilities);
        for (let i=0; i<hospitals.length; i+=1) {
            let option = document.createElement('option');
            option.value = hospitals[i];
            option.text = hospitals[i];
            facilities.appendChild(option);
        }
        const facilities2 = document.createElement('select');
        facilities2.className = 'select';
        facilities2.id = 'facility2';
        document.getElementById('select_facility2').appendChild(facilities2);
        for (let i=0; i<hospitals.length; i+=1) {
            let option = document.createElement('option');
            option.value = hospitals[i];
            option.text = hospitals[i];
            facilities2.appendChild(option);
        }
        document.getElementById('facility2').addEventListener('change',getListVisits);
        const instrument = document.createElement('select');
        instrument.className = 'select';
        instrument.multiple='multiple';
        instrument.id = 'instrument';
        document.getElementById('select_instrument').appendChild(instrument);
        for (let i=0; i<instruments.length; i+=1) {
            let option = document.createElement('option');
            option.value = instruments[i];
            option.text = instruments[i];
            instrument.appendChild(option);
        }
        const instrument2 = document.createElement('select');
        instrument2.className = 'select';
        instrument2.id = 'instrument2';
        document.getElementById('select_instrument2').appendChild(instrument2);
        for (let i=0; i<instruments2.length; i+=1) {
            let option = document.createElement('option');
            option.value = instruments2[i];
            option.text = instruments2[i];
            instrument2.appendChild(option);
        }
        document.getElementById('instrument2').addEventListener('change',getListVisits);
    })
}
window.onload = getFacilities();

/* Выезды */
document.getElementById('visits').addEventListener('click',visitsClick);
function visitsClick() {
    document.getElementById('myTopnav').querySelectorAll('.active').forEach((el)=>el.classList.remove('active'));
    document.getElementById('visits').classList.add('active');
    burgerMenu();
    document.querySelectorAll('.main').forEach((el)=>el.classList.add('hide'));
    document.getElementById('visit_box').classList.add('hide');
    document.getElementById('confirm_visit').classList.add('hide');
    document.getElementById('visits_list').classList.add('hide');
    document.getElementById('visitsPage').classList.remove('hide');
}

document.getElementById('add_visit').addEventListener('click',addVisitsClick);
function addVisitsClick() {
    document.getElementById('visit_box').classList.remove('hide');
    document.getElementById('confirm_visit').classList.remove('hide');
    document.getElementById('table_field').innerHTML='';
    document.getElementById('visits_list').classList.add('hide');
}

document.getElementById('confirm_visit').addEventListener('click',confirmVisitsClick);
function confirmVisitsClick() {
    const date = document.getElementById('date').value;
    const date2 = document.getElementById('date2').value;
    const application = document.getElementById('application').value;
    const facility = document.getElementById('facility').value;
    const instrument = [];
    const x = document.getElementById('instrument');
    for (let i=0; i<x.options.length; i++){
        if(x.options[i].selected == true) {
            instrument.push(x.options[i].value)
        }
    }
    const sn = document.getElementById('sn').value;
    const reason = document.getElementById('reason').value;
    const work = document.getElementById('work').value;
    const report = document.getElementById('report').value;
    const type = document.getElementById('visit_type').value;
    if (date === "") document.getElementById('confirmation_status').innerText='Выберите дату начала';
    else if (date2 === "") document.getElementById('confirmation_status').innerText='Выберите дату конца визита';
    else if (application === "") document.getElementById('confirmation_status').innerText='Выберите аппликатора';
    else if (facility === "") document.getElementById('confirmation_status').innerText='Выберите учреждение';
    else if (instrument.length === 0) document.getElementById('confirmation_status').innerText='Выберите прибор(ы)';
    else if (reason === "") document.getElementById('confirmation_status').innerText='Укажите причину выезда';
    else if (work === "") document.getElementById('confirmation_status').innerText='Укажите выполненные работы';
    else if (report === "") document.getElementById('confirmation_status').innerText='Выберите статус акта';
    else if (type === "") document.getElementById('confirmation_status').innerText='Выберите тип выезда';
    else {
        document.getElementById('confirmation_status').classList.remove('red_status');
        document.getElementById('confirmation_status').classList.add('green_status');
        document.getElementById('confirmation_status').innerText='Выезд добавляется в базу';
        downloadVisitToDatabase(date, date2, application, facility, instrument, sn, reason, work, report, type);
    }
}
function downloadVisitToDatabase(date, date2, application, facility, instrument, sn, reason, work, report, type) {
    if (type=="Обучение") {
        fetch('https://sheetdb.io/api/v1/tkhtt2o9c61js?sheet=learning', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'Дата с': `${date}`,
                        'Дата по': `${date2}`,
                        'Учреждение': `${facility}`,
                        'Прибор': `${instrument}`,
                        'SN': `${sn}`,
                        'Аппликатор': `${application}`,
                    }
                ]
            })
        }) 
    }
    fetch('https://sheetdb.io/api/v1/tkhtt2o9c61js?sheet=visits', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'Дата с': `${date}`,
                    'Дата по': `${date2}`,
                    'Учреждение': `${facility}`,
                    'Прибор': `${instrument}`,
                    'SN': `${sn}`,
                    'Аппликатор': `${application}`,
                    'Причина выезда': `${reason}`,
                    'Выполненные работы': `${work}`,
                    'Акт': `${report}`,
                    'Тип работ': `${type}`,
                }
            ]
        })
    })
    .then(res => res.text())
    .then(rep => {
        document.getElementById('confirmation_status').innerText='Выезд добавлен в базу';
        setTimeout(()=>{
           window.location.reload(); 
        },1500)
    })
}

document.getElementById('list_visits').addEventListener('click',listVisitsClick);
function listVisitsClick() {
    document.getElementById('visit_box').classList.add('hide');
    document.getElementById('confirm_visit').classList.add('hide');
    document.getElementById('visits_list').classList.remove('hide');
    getListVisits();
}

document.getElementById('week_filter').addEventListener('click',changeFilterWeekState);
function changeFilterWeekState() {
    const filter = document.getElementById('week_filter')
    if (filter.classList.contains('filter_selected')) filter.classList.remove('filter_selected')
    else filter.classList.add('filter_selected')
    getListVisits();
}
document.getElementById('learning_filter').addEventListener('click',changeFilterLearningState);
function changeFilterLearningState() {
    const filter = document.getElementById('learning_filter')
    if (filter.classList.contains('filter_selected')) filter.classList.remove('filter_selected')
    else filter.classList.add('filter_selected')
    getListVisits();
}

function getListVisits() {
    document.getElementById('table_field').innerHTML='';
    const url = `https://docs.google.com/spreadsheets/d/16ABEN54Ykbej-PhrbBjGlaHSXzNbD4PA8ecbpWc5QHQ/gviz/tq?gid=0`;
    const date1 = [];
    const date2 = [];
    const place = [];
    const machine = [];
    const sn = [];
    const applicator = [];
    const why = [];
    const done = [];
    const file = [];
    const filter_man = document.getElementById('application2').value;
    const filter_hospital = document.getElementById('facility2').value;
    const filter_instrument = document.getElementById('instrument2').value;
    const filter_week = document.getElementById('week_filter').classList.contains('filter_selected')? new Date().setDate(new Date().getDate()-7) : "";
    const filter_learning = document.getElementById('learning_filter').classList.contains('filter_selected')? "Обучение": "";
    fetch(url)
    .then(res => res.text())
    .then(rep => {
        const data2 = JSON.parse(rep.substr(47).slice(0,-2));
        let data3=data2;
        data3 = filter_man !=="" ?  data3.table.rows.filter((el)=>el.c[5].v===filter_man): data3.table.rows.filter((el)=>el.c[5].v!=="zaty4ka");
        data3 = filter_hospital !=="" ? data3.filter((el)=>el.c[2].v===filter_hospital): data3.filter((el)=>el.c[2].v!=="zaty4ka");
        data3 = filter_instrument !==""? data3.filter((el)=>el.c[3].v.includes(filter_instrument)): data3.filter((el)=>el.c[3].v!=='zaty4ka');
        data3 = filter_week !==""? data3.filter((el)=>new Date(el.c[1].v.split('Date(')[1].split(')')[0].split(',')[0],el.c[1].v.split('Date(')[1].split(')')[0].split(',')[1],el.c[1].v.split('Date(')[1].split(')')[0].split(',')[2])>filter_week): data3;
        data3 = filter_learning !==""? data3.filter((el)=>el.c[9].v===filter_learning): data3.filter((el)=>el.c[9].v!=='zaty4ka');
        const length = data3.length;
        for (let i=0; i<length; i+=1) {
            (data3[i].c[0] && data3[i].c[0].v != null) ? date1.push(data3[i].c[0].v.split('Date(')[1].split(')')[0]) : date1.push('');
            (data3[i].c[1] && data3[i].c[1].v != null) ? date2.push(data3[i].c[1].v.split('Date(')[1].split(')')[0]) : date2.push('');
            (data3[i].c[2] && data3[i].c[2].v != null) ? place.push(data3[i].c[2].v) : place.push('');
            (data3[i].c[3] && data3[i].c[3].v != null) ? machine.push(data3[i].c[3].v) : machine.push('');
            (data3[i].c[4] && data3[i].c[4].v != null) ? sn.push(data3[i].c[4].v) : sn.push('');
            (data3[i].c[5] && data3[i].c[5].v != null) ? applicator.push(data3[i].c[5].v) : applicator.push('');
            (data3[i].c[6] && data3[i].c[6].v != null) ? why.push(data3[i].c[6].v) : why.push('');
            (data3[i].c[7] && data3[i].c[7].v != null) ? done.push(data3[i].c[7].v) : done.push('');
            (data3[i].c[8] && data3[i].c[8].v != null) ? file.push(data3[i].c[8].v) : file.push('');
        }
        const table = document.createElement('table');
        table.className = 'supertable';
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const players_column_width = (width - 50) / 10;
        for (let i=0; i<length+1; i+=1) {
            const tr = table.insertRow();
            tr.className = 'superrow';
            for (let j=0; j<=9; j+=1) {
                const td = tr.insertCell();
                if (i===0 && j!==0) td.appendChild(document.createTextNode(`${data2.table.cols[j-1].label}`));
                if (j===0) {
                    td.className = 'ordercell';
                    td.classList.add('hide_column');
                    if (i>0) td.appendChild(document.createTextNode(`${i}`))
                } else {
                    td.className = 'supercell';
                    td.style.width = (j===1||j===2||j===4||j===5||j===6||j===9)? `${players_column_width*0.5}px`:  `${players_column_width*1.4}px`;
                    if (j===2|| j===5||j===6|| j===8|| j===9) td.classList.add('hide_column');
                    if (j===1 && i>0) {
                        td.appendChild(document.createTextNode(`${new Date(date1[i-1].split(',')[0],date1[i-1].split(',')[1],date1[i-1].split(',')[2]).toLocaleString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'})}`))
                    } else if (j===2 && i>0) {
                        td.appendChild(document.createTextNode(`${new Date(date2[i-1].split(',')[0],date2[i-1].split(',')[1],date2[i-1].split(',')[2]).toLocaleString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'})}`))
                    } else if (j===3 && i>0) {
                        td.appendChild(document.createTextNode(`${place[i-1]}`))
                    } else if (j===4 && i>0) {
                        td.appendChild(document.createTextNode(`${machine[i-1]}`))
                    } else if (j===5 && i>0) {
                        td.appendChild(document.createTextNode(`${sn[i-1]}`))
                    } else if (j===6 && i>0) {
                        td.appendChild(document.createTextNode(`${applicator[i-1]}`))
                    } else if (j===7 && i>0) {
                        td.appendChild(document.createTextNode(`${why[i-1]}`))
                    } else if (j===8 && i>0) {
                        td.appendChild(document.createTextNode(`${done[i-1]}`))
                    } else if (j===9 && i>0) {
                        td.appendChild(document.createTextNode(`${file[i-1]}`))
                    }
                };
            }
        }
        document.getElementById('table_field').appendChild(table);
    })
}



/* calc Dxh800 */
document.getElementById('dxh800').addEventListener('click',DxH800Click);
function DxH800Click() {
    document.getElementById('myTopnav').querySelectorAll('.active').forEach((el)=>el.classList.remove('active'));
    document.getElementById('dxh800').classList.add('active');
    burgerMenu();
    document.querySelectorAll('.main').forEach((el)=>el.classList.add('hide'));
    document.getElementById('calcDxH800').classList.remove('hide');
}
document.getElementById('confirm_calc_dxh800').addEventListener('click',DxH800Calculate);
document.getElementById('delete_calc_dxh800').addEventListener('click',DxH800Clear);
document.getElementById('delete_form_calc_dxh800').addEventListener('click',DxH800FormClear);

function DxH800Clear() {
    document.getElementById('table_field_calc_dxh800').innerHTML='';
}
function DxH800FormClear() {
    document.getElementById('hospital_800').value="";
    document.getElementById('capacity800').value="";
    document.getElementById('retic800').value=0;
}

function DxH800Calculate() {
    const instruments = document.getElementById('dxh800_count').value;
    const hospital = document.getElementById('hospital_800').value;
    const potok = Number(document.getElementById('capacity800').value);
    const days_per_week = document.getElementById('days_per_week800').value;
    const months = document.getElementById('months800').value;
    const calc_type = document.getElementById('calc_dxh800_type').value;
    const type_6C = document.getElementById('6C_type800').value;
    const retic = document.getElementById('retic800').value;
    const controls = calc_type <= 1? 3 : 0;
    const diluent = Math.ceil((months*30.5*days_per_week/7*(15+controls)*instruments+potok)/160);
    const lysepack = Math.ceil((months*30.5*days_per_week/7*(16+controls)*instruments+potok)/4545*(calc_type<=1? 1.25 : 1));
    const diffpack = Math.ceil((months*30.5*days_per_week/7*(26+controls)*instruments+potok)/2125);
    const cleaner = Math.ceil((months*30.5*days_per_week/7*instruments)/28); /*Делим на 28, закладывая 2 доп промывки */
    let reticpack = Math.ceil((months*30.5*days_per_week/7*(10+controls)*instruments+potok*retic/100)/904); /*Посмотреть где-нибудь расход ретика на шатдаун/дейличек, 20 от балды*/
    reticpack = retic == 0 ? 0 : reticpack < months/4 ? Math.ceil(months/4) : reticpack;
    const controls_6C_9 = type_6C == 2? 0 : calc_type == 1 ? Math.ceil(months*Math.ceil(instruments/2)/1.5) : calc_type == 2? Math.ceil(months*Math.ceil(instruments/2)/2) : Math.ceil(months*Math.ceil(instruments/2)/3);
    const controls_6C_12 = type_6C == 1? 0 : calc_type == 1 ? Math.ceil(months*Math.ceil(instruments/2)/1.5) : calc_type == 2? Math.ceil(months*Math.ceil(instruments/2)/2.5) : Math.ceil(months*Math.ceil(instruments/2)/3.5);  
    const latron = calc_type == 1 ? Math.ceil(months/4)*instruments : calc_type == 2 ? Math.ceil(months/6)*instruments : instruments;
    const control_retic = retic == 0 ? 0 : calc_type == 1 ? Math.ceil(months/3)*Math.ceil(instruments/2) : calc_type == 2 ? Math.ceil(months/4)*Math.ceil(instruments/2) : Math.ceil(months/6)*Math.ceil(instruments/2);
    const calibrator = calc_type == 1 ? 2*instruments : 1*instruments;
    const table_length = retic > 0 ? 9 : 7;
    const table = document.createElement('table');
    table.className = 'supertable';
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const column_width = (width - 50) / 5;
    const headers = ['Реактив','Количество'];
    const reactive_v1 = ['DxH Дилюент, 10 л','DxH Лизирующий раствор, 5 л','DxH Реагенты для дифференцировки лейкоцитов, 2,75 л.','DxH Реагенты для анализа ретикулоцитов','DxH Промывающий реагент, 10 л','Контроль 6С, 9x3.5 мл','Контроль для ретикулоцитов RETIC-X, 12x3.5 мл','Контроль Latron CP-X, 8х4 мл','Калибратор S-CAL, 1x3.3 ml'];
    const reactive_v2 = ['DxH Дилюент, 10 л','DxH Лизирующий раствор, 5 л','DxH Реагенты для дифференцировки лейкоцитов, 2,75 л.','DxH Промывающий реагент, 10 л','Контроль 6С, 9x3.5 мл','Контроль Latron CP-X, 8х4 мл','Калибратор S-CAL, 1x3.3 ml'];
    const reactive_v3 = ['DxH Дилюент, 10 л','DxH Лизирующий раствор, 5 л','DxH Реагенты для дифференцировки лейкоцитов, 2,75 л.','DxH Реагенты для анализа ретикулоцитов','DxH Промывающий реагент, 10 л','Контроль 6С, 12x3.5 мл','Контроль для ретикулоцитов RETIC-X, 12x3.5 мл','Контроль Latron CP-X, 8х4 мл','Калибратор S-CAL, 1x3.3 ml'];
    const reactive_v4 = ['DxH Дилюент, 10 л','DxH Лизирующий раствор, 5 л','DxH Реагенты для дифференцировки лейкоцитов, 2,75 л.','DxH Промывающий реагент, 10 л','Контроль 6С, 12x3.5 мл','Контроль Latron CP-X, 8х4 мл','Калибратор S-CAL, 1x3.3 ml'];
    const reactive_final = type_6C == 1 && retic == 0? reactive_v2: type_6C == 1 && retic !== 0? reactive_v1: retic==0? reactive_v4: reactive_v3;
    const format_v1 = [diluent,lysepack,diffpack,reticpack,cleaner,controls_6C_9,control_retic,latron,calibrator];
    const format_v2 = [diluent,lysepack,diffpack,cleaner,controls_6C_9,latron,calibrator];
    const format_v3 = [diluent,lysepack,diffpack,reticpack,cleaner,controls_6C_12,control_retic,latron,calibrator];
    const format_v4 = [diluent,lysepack,diffpack,cleaner,controls_6C_12,latron,calibrator];
    const format_final = type_6C == 1 && retic == 0? format_v2: type_6C == 1 && retic !== 0? format_v1: retic==0? format_v4: format_v3;
    for (let i=0; i<table_length+1; i+=1) {
        const tr = table.insertRow();
        tr.className = 'superrow';
        for (let j=0; j<=headers.length; j+=1) {
            const td = tr.insertCell();
            if (j===0) {
                td.className = 'ordercell';
                if (i>0) td.appendChild(document.createTextNode(`${i}`))
            } else {
                td.className = 'supercell';
                td.style.width = `${column_width}px`;
                if (i===0) {
                    td.appendChild(document.createTextNode(`${headers[j-1]}`));
                }
                if (j===1 && i!==0) td.appendChild(document.createTextNode(`${reactive_final[i-1]}`));
                if (j===2 && i!==0) td.appendChild(document.createTextNode(`${format_final[i-1]}`));
            };
        }
    }
    document.getElementById('table_field_calc_dxh800').appendChild(table);
    downloadCalcDxH800ToDatabase(hospital, potok, days_per_week, months,diluent, lysepack, diffpack, reticpack, cleaner, controls_6C_9, controls_6C_12, control_retic, latron, calibrator);
}

function downloadCalcDxH800ToDatabase(facility, capacity, days_per_week, months, diluent, lysepack, diffpack, reticpack, cleaner, controls_6C_9, controls_6C_12, control_retic, latron, calibrator) {
    fetch('https://sheetdb.io/api/v1/tkhtt2o9c61js?sheet=dxh800', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'date': `${new Date()}`,
                    'facility': `${facility}`,
                    'capacity': `${capacity}`,
                    'days_per_week': `${days_per_week}`,
                    'month': `${months}`,
                    'diluent': `${diluent}`,
                    'lyse': `${lysepack}`,
                    'diff': `${diffpack}`,
                    'retic': `${reticpack}`,
                    'cleaner': `${cleaner}`,
                    '6c_9': `${controls_6C_9}`,
                    '6c_12': `${controls_6C_12}`,
                    'retic_control': `${control_retic}`,
                    'latron': `${latron}`,
                    's-cal': `${calibrator}`,
                }
            ]
        })
    }) 
}

/* calc Dxh500 */
document.getElementById('dxh500').addEventListener('click',DxH500Click);
function DxH500Click() {
    document.getElementById('myTopnav').querySelectorAll('.active').forEach((el)=>el.classList.remove('active'));
    document.getElementById('dxh500').classList.add('active');
    burgerMenu();
    document.querySelectorAll('.main').forEach((el)=>el.classList.add('hide'));
    document.getElementById('calcDxH500').classList.remove('hide');
}
document.getElementById('confirm_calc_dxh500').addEventListener('click',DxH500Calculate);
document.getElementById('delete_calc_dxh500').addEventListener('click',DxH500Clear);
document.getElementById('delete_form_calc_dxh500').addEventListener('click',DxH500FormClear);

function DxH500Clear() {
    document.getElementById('table_field_calc_dxh500').innerHTML='';
}
function DxH500FormClear() {
    document.getElementById('hospital_500').value="";
    document.getElementById('capacity500').value="";
    document.getElementById('retic500').value=0;
}

function DxH500Calculate() {
    const instruments = document.getElementById('dxh500_count').value;
    const hospital = document.getElementById('hospital_500').value;
    const potok = Number(document.getElementById('capacity500').value);
    const days_per_week = document.getElementById('days_per_week500').value;
    const months = document.getElementById('months500').value;
    const calc_type = document.getElementById('calc_dxh500_type').value;
    
    const controls = calc_type <= 1? 3 : 0;
    const diluent = Math.ceil((months*30.5*days_per_week/7*(13+controls)*instruments+potok+potok/50)/750);
    const lysepack = Math.ceil((months*30.5*days_per_week/7*(8+controls)*instruments+potok+potok/50)/750);
    const cleaner = Math.ceil((months*30.5*days_per_week/7*(100+controls)*instruments+potok+6*potok/50)/1180);
    const controls_6C_9 = calc_type == 1 ? Math.ceil(months*Math.ceil(instruments/2)/1.5) : calc_type == 2? Math.ceil(months*Math.ceil(instruments/2)/2) : Math.ceil(months*Math.ceil(instruments/2)/3);
    const calibrator = calc_type == 1 ? 2*instruments : 1*instruments;
    const table_length = 5;
    const table = document.createElement('table');
    table.className = 'supertable';
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const column_width = (width - 50) / 5;
    const headers = ['Реактив','Количество'];
    const reactive_final = ['DxH500 Series Diluent','DxH500 Series Lyse','DxH500 Series Cleaner','DxH 500 Series Control','DxH 500 Series Calibrator'];
    const format_final = [diluent,lysepack,cleaner,controls_6C_9,calibrator];
    for (let i=0; i<table_length+1; i+=1) {
        const tr = table.insertRow();
        tr.className = 'superrow';
        for (let j=0; j<=headers.length; j+=1) {
            const td = tr.insertCell();
            if (j===0) {
                td.className = 'ordercell';
                if (i>0) td.appendChild(document.createTextNode(`${i}`))
            } else {
                td.className = 'supercell';
                td.style.width = `${column_width}px`;
                if (i===0) {
                    td.appendChild(document.createTextNode(`${headers[j-1]}`));
                }
                if (j===1 && i!==0) td.appendChild(document.createTextNode(`${reactive_final[i-1]}`));
                if (j===2 && i!==0) td.appendChild(document.createTextNode(`${format_final[i-1]}`));
            };
        }
    }
    document.getElementById('table_field_calc_dxh500').appendChild(table);
    downloadCalcDxH500ToDatabase(hospital, potok, days_per_week, months,diluent, lysepack, cleaner, controls_6C_9, calibrator);
}

function downloadCalcDxH500ToDatabase(facility, capacity, days_per_week, months, diluent, lysepack, cleaner, controls_6C_9, calibrator) {
    fetch('https://sheetdb.io/api/v1/tkhtt2o9c61js?sheet=dxh500', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    'date': `${new Date()}`,
                    'facility': `${facility}`,
                    'capacity': `${capacity}`,
                    'days_per_week': `${days_per_week}`,
                    'month': `${months}`,
                    'diluent': `${diluent}`,
                    'lyse': `${lysepack}`,
                    'cleaner': `${cleaner}`,
                    'control': `${controls_6C_9}`,
                    'calibrator': `${calibrator}`,
                }
            ]
        })
    }) 
}
