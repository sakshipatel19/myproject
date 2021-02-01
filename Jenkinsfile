def label = "worker-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
  containerTemplate(name: 'gradle', image: 'gradle:4.5.1-jdk9', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'docker', image: 'eu.gcr.io/publicismedia-cortex-216901/customdocker:v1', command: 'cat', ttyEnabled: true)
],
volumes: [
  hostPathVolume(mountPath: '/home/gradle/.gradle', hostPath: '/tmp/jenkins/.gradle'),
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
node(label) {
  def dockerImage

  stage('checkout') {
        checkout scm
}


stage('sonar-scanner analysis') {
  def sonarqubeScannerHome = tool name: 'sonarqubescanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
  withCredentials([string(credentialsId: '50a62216-7d09-47e6-9261-64b70ad19e60', variable: 'sonarLogin')]) {
    sh "${sonarqubeScannerHome}/bin/sonar-scanner -X -Dsonar.host.url=http://devsonar.commerceinternal.local -Dsonar.login=${sonarLogin} -Dsonar.projectName=${env.JOB_NAME} -Dsonar.projectVersion=${env.BUILD_NUMBER} -Dsonar.projectKey=${env.JOB_BASE_NAME}"
  }
}

  stage('Build image') {
        container('docker') {
        dockerImage = docker.build("eu.gcr.io/publicismedia-cortex-216901/jenkins-ui-dashboard")
}
}

  stage('Push image') {
        container('docker') {
        docker.withRegistry('https://eu.gcr.io/' , "gcr:publicismedia-cortex-216901") {
  dockerImage.push("${image_tag}-${env.BUILD_NUMBER}")

        }
  }
}

}
}
