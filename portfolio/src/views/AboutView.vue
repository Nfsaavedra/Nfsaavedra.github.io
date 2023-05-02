<template>
  <div class="about">
    <div style="display: flex; justify-content: center; margin-top: 30px">
      <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
        <b-avatar src="img/avatar.png" size="15vh"></b-avatar>
        <div style="margin-left: 25px;">
          <h5 style="margin-top: -4px; color: rgb(48, 48, 48)">Computer Scientist</h5>
          <h5 style="margin-top: -4px;"><a href="mailto:nuno@saavedra.pt">nuno@saavedra.pt</a></h5>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-5" style="padding-left: 5vw; padding-right: 5vw;">
      <div class="row">
        <div class="col-lg-6 col-xl-4">
          <h2>📖 Teaching</h2>
          <h5>Teaching Assistant: </h5>
          <ul>
            <li><a href="https://fenix.tecnico.ulisboa.pt/disciplinas/LP2/2021-2022/1-semestre" target="_blank">Logic for Programming 2021/2022 @ IST</a></li>
            <b-badge>Excellent Teacher Award</b-badge>
            <li><a href="https://fenix.tecnico.ulisboa.pt/disciplinas/PO65179577/2020-2021/1-semestre" target="_blank">Object Oriented Programming 2020/2021 @ IST</a></li>
            <b-badge>Excellent Teacher Award</b-badge>
          </ul>
        </div>
        <div class="col-lg-6 col-xl-4">
          <h2>🔬 Research Interests</h2>
          <ul>
            <li><h5>Software Reliability</h5></li>
            <li><h5>Software Verification</h5></li>
            <li><h5>Infrastructure as Code</h5></li>
          </ul>
        </div>
        <div class="col-lg-6 col-xl-4">
          <h2>🏭 Industry Experience</h2>
          <h5>Full-Stack Software Engineer</h5>
          <ul>
            <li id="caravela" class="job">Caravela Energy Partners</li>
            <li id="hxb" class="job">HXB Informática e Tecnologia</li>
            <li id="dei" class="job">Department of Computer Science and Engineering @ IST</li>
          </ul>
          <b-popover target="caravela" triggers="hover" placement="top">
            <template #title>
              Caravela Energy Partners 
              <b-badge>Sep 2022 - Nov 2022
            </b-badge></template>
            Created solutions in Python, Terraform and Google Cloud to better visualize data about the energy market, automate data pipelines, and centralize the logging systems.
          </b-popover>
          <b-popover target="hxb" triggers="hover" placement="top">
            <template #title>
              HXB Informática e Tecnologia
              <b-badge>Apr 2022 - Sep 2022
            </b-badge></template>
            Development of web applications in Spring for an international broker network.
          </b-popover>
          <b-popover target="dei" triggers="hover" placement="top">
            <template #title>
              Department of Computer Science and Engineering @ IST
              <b-badge>Sep 2019 - Mar 2021
            </b-badge></template>
            Development of a web application in Spring and Vue. Management of Linux servers, Windows servers and workstations with Ansible. Technical support.
          </b-popover>
        </div>
        <div class="col-lg-6 col-xl-4">
          <h2>🎓 Education</h2>
          <ul>
            <li><h5 style="margin-bottom: 0px;">MSc in Computer Science and Engineering</h5><span style="color: rgb(48, 48, 48)">Instituto Superior Técnico</span></li>
            <li><h5 style="margin-bottom: 0px;">BSc in Computer Science and Engineering</h5><span style="color: rgb(48, 48, 48)">Instituto Superior Técnico</span></li>
          </ul>
        </div>
        <div class="col-lg-6 col-xl-4">
          <h2>➕ Other Experiences</h2>
          <ul>
            <li><a href="https://www.codingame.com/multiplayer/bot-programming/tic-tac-toe/leaderboard" target="_blank">Top 500 on CodinGame's Ultimate Tic Tac Toe</a><span style="color: rgb(48, 48, 48)"> (Nfsaavedra)</span></li>
            <li><a href="https://github.com/ansible-collections/community.aws/pull/1724" target="_blank">Contributor of the Ansible module community.aws</a></li>
          </ul>
        </div>
        <div class="col-lg-6 col-xl-4">
          <h2>♟️ Hobbies</h2>
          <ul>
            <li><h5>Running/Hiking</h5></li>
            <li><h5>Chess</h5></li>
            <li><h5>Anime</h5></li>
            <li><h5>Gaming</h5></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #535e79 !important;
}

a:hover {
  color: #881600 !important;
}

.job {
  color: #535e79 !important;
}

.job:hover {
  color: #881600 !important;
}

.row {
  padding-left: 10px;
  text-align: left;
}

.row h2 {
  text-align: center;
  padding-bottom: 4px;
  padding-top: 30px;
}
</style>