#!groovy
node {
  
    env.NODEJS_HOME = "${tool 'node'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
   
  stage('SCM') {
       checkout scm
    }

    stage('SonarQube') {
      //def scannerHome = tool 'SonarQube Scanner 3.2';
      withSonarQubeEnv('SonarQube') {
        sh "npm i sonarqube-scanner-node"
        sh "npm run sonarqube "
      }    
    }    
  }






 
