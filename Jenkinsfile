#!groovy
node {
  
    env.NODEJS_HOME = "${tool 'node'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
   
  stage('SCM') {
       checkout scm
    }

  stage('testes') {
	sh 'npm install'	
       sh 'nyc --reporter=lcov --reporter=text-lcov npm test'

  }

    stage('SonarQube') {
      //def scannerHome = tool 'SonarQube Scanner 3.2';
    def sonarQubeScript = packageJson.scripts['sonarqube']    
    if(sonarQubeScript) {      
        try {
            withSonarQubeEnv('SonarQube') {
              sh "npm i sonarqube-scanner-node"
              sh "npm run sonarqube "
            }
          }catch(Exception e) {
            println e.getMessage()
            echo "Não foi possível executar o sonarqube"
          }
    }  
  }
  
  stage('Final') {
    echo "Sucesso"
  }
  
  }






 
