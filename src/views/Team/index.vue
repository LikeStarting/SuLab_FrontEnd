<template>
    <div class="teams-wrapper">
        <div class="team team-one">
            <a-row>
                <a-col class="img" :span="8">
                    image
                </a-col>
                <a-col class="intro" :span="16">
                    <div>
                        <h2>Name</h2>
                        <p>Introducation</p>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="team team-two">
            <h2>
                <span>Postdocs</span>
                <!-- <span class="rect"></span> -->
            </h2>
            <div class="member">
                
            </div>
        </div>
        <div class="team team-three">
            <h2>
                <span>PhD Students</span>
                <!-- <span class="rect"></span> -->
            </h2>
            <div class="member">

            </div>
        </div>
        <div class="team team-three">
            <h2>
                <span>Graduate Students</span>
                <!-- <span class="rect"></span> -->
            </h2>
            <div class="member">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default { name: 'TeamsPage' }
</script>


<style>
.teams-wrapper {
    width: 100%;
    max-width: 1340px;
    margin: 0 auto;
    padding: 20px 50px;
}
.team {
    padding: 20px 0;
    &>h2 {
        text-align: center;
        position: relative;
        span:first-child {
            display: inline-block;
            /* width: 200px; */
            height: 40px;
            padding-left: 20px;
            padding-right: 80px;
            line-height: 40px;
            text-align: left;
            background: url(../../assets/images/team-title.png) no-repeat center / cover;
            font-family: IBM Plex Mono serif;
            /* position: absolute;
            left: 50%;
            top: 50%;
            width: 80px;
            height: 40px;
            margin-left: -40px;
            margin-top: -20px; */
        }
        span.rect {
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 60px;
            height: 40px;
            margin-left: -30px;
            margin-top: -20px;
            border: 2px solid #9DDBF8;
            z-index: 1;
        }
    }
}
</style>