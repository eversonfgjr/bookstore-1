node {
    stage('SCM') {
        git url: 'https://github.com/eversonfgjr/bookstore-1.git', -- url projeto
            branch: 'master' -- branch do projeto
    }

    stage('SonarQube') {
      withSonarQubeEnv('SonarQube') {
        sh "npm run sonarqube "
      }    
    }    
  }






 
