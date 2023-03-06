<template>
    <div>
        <h1>JOB</h1>
        <div class="cont">
        <div class="jobdetail">
            <div class="box"><h4>9</h4><h5>Menunggu Konfirmasi</h5></div>
            <div class="vl"></div>
            <div class="box"><h4>9</h4><h5>Siap Kirim</h5></div>
            <div class="vl"></div>
            <div class="box"><h4>9</h4><h5>Terkirim</h5></div>
        </div>
        <div class="performancedetail">
            <div class="title">MY PERFORMANCE</div>
            <div class="detail">
            <div class="box"><h4>9</h4><h5>Menunggu Konfirmasi</h5></div>
            <div class="vl"></div>
            <div class="box"><h4>9</h4><h5>Siap Kirim</h5></div>
            <div class="vl"></div>
            <div class="box"><h4>9</h4><h5>Terkirim</h5></div>
        </div>
        </div>
    </div>
    </div>
    

</template>

<style scoped>
.jobdetail {
    background-color: rgb(255, 228, 233);
    width:60%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    border-radius: 20px;
    margin: 20px;
}
.title{
    text-align: left;
    margin: 20px;
}
.performancedetail{
    background-color: rgb(255, 228, 233);
    width:60%;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    border-radius: 20px;
    margin: 20px;
}
.detail{
    display: flex;
}
.box{
    text-align: center;
    margin:30px;
}
.cont{
    display: flex;
}
.vl {
  border-left: 2px solid rgb(163, 163, 163);
  height: 100px;
}
</style>