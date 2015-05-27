export default ngModule => {
    require('./auth')(ngModule);
    require('./user')(ngModule);
}