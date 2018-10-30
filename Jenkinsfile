#!groovy
node {
  
    env.NODEJS_HOME = "${tool 'node'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
   
  stage('SCM') {
       checkout scm
    }

    stage('SonarQube') {
      withSonarQubeEnv('SonarQube') {
        sh "npm run sonarqube "
      }    
    }    
  }






 
