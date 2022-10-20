$(document).ready(function() {
  ;[
    'id_articleBody',
    'id_awards',
    'id_benefits',
    'id_commentText',
    'id_dependencies',
    'id_description',
    'id_educationRequirements',
    'id_experienceRequirements',
    'id_incentives',
    'id_incentiveCompensation',
    'id_jobBenefits',
    'id_lodgingUnitDescription',
    'id_qualifications',
    'id_responsibilities',
    'id_reviewBody',
    'id_skills',
    'id_text',
    'id_transcript',
  ].forEach(function(i) {
    $('#' + i).length && CKEDITOR.replace(i)
  }),
    $('body>nav').adonHideOnScrollDown()
})
