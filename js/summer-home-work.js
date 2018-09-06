var db = firebase.database()
var voteCountAll = db.ref('/')
const toast_html = '<span class="toast-text">投票が完了しました！</span>'

$(function () {
    const cookie_key = 'vote-flag'
    let cookie_value = $.cookie(cookie_key)
    if (cookie_value == 1) {
        $('.vote-button').addClass('disabled')
    }
})

$('.vote-button').on('click', function() {
    const name = $(this).data('name')
    const cookie_key = 'vote-flag'
    let cookie_value = $.cookie(cookie_key)

    if (cookie_value !== 1) {
        cookie_name = $.cookie(name)
        voteCountAll = db.ref('/' + name)
        updateData(name)
        $.cookie('vote-flag', 1)
        $('.vote-button').addClass('disabled')
        M.toast({html: toast_html})
    }
})

function updateData(name) {
    voteCountAll = db.ref('/' + name)
    voteCountAll.once('value', function(snapshot, name) {
        let vote_key = snapshot.key
        if (vote_key != null) {
            let vote_count = snapshot.val()
            if (vote_count !== null) {
                voteCountAll.update({title:'vote-count/', text:vote_count.text + 1})
                return
            }
        }
        voteCountAll.set({title:'vote-count/', text:1})
    })
}
