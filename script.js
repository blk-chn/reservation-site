document.getElementById("reservationForm").addEventListener("submit", function(event) {
        event.preventDefault(); // ページのリロードを防ぐ

        let name = document.getElementById("name").value;
        let date = document.getElementById("date").value;
        let time = document.getElementById("time").value;
        let email = document.getElementById("email").value;

        let reservation = {
            name: name,
            date: date,
            time: time,
            email: email
        };

        // ローカルストレージに保存
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        reservations.push(reservation);
        localStorage.setItem("reservations", JSON.stringify(reservations));

        // 予約一覧を更新
        displayReservations();
    });

    function displayReservations() {
        let reservationList = document.getElementById("reservationList");
        reservationList.innerHTML = "<ul class='reservation-list'></ul>";

        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

        reservations.forEach((reservation, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("reservation-item");
            listItem.innerHTML = `
                <span><strong>${reservation.name}</strong> - ${reservation.date} ${reservation.time} (${reservation.email})</span>
                <button class="delete-btn" onclick="deleteReservation(${index})">削除</button>
            `;
            reservationList.querySelector("ul").appendChild(listItem);
        });
    }

    function deleteReservation(index) {
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        reservations.splice(index, 1); // 指定した予約を削除
        localStorage.setItem("reservations", JSON.stringify(reservations));

        displayReservations(); // 更新
    }

    // 過去の日付選べないようにする
    document.addEventListener("DOMContentLoaded", function() {
        let dateInput = document.getElementById("date");

        let today = new Date().toISOString().split("T")[0]; // 今日の日付を取得
        dateInput.setAttribute("min", today); // `min` 属性で最小値を設定
    });

    // 時間帯を制限
    document.addEventListener("DOMContentLoaded", function() {
        const timeSelect = document.getElementById("time");
        
        // 時間生成（9:00～18:00 10分単位）
        const startHour = 9;
        const endHour = 18;

        for (let hour = startHour; hour <= endHour; hour++) {
                if (hour === endHour && minute > 0) break; //18:10以降は追加しない

                const h = String(hour).padStart(2, "0");
                const m = String(minute).padStart(2, "0");
                const option = document.createElement("option");
                option.value = '${h}:${m}';
                option.texContent = '${h}:${m}';
                timeSelect.appendChild(option);
        }

        // 許可されていない時間を選択した場合、修正する
        timeInput.addEventListener("change", function() {
            const selectedTime = timeInput.value;
            if (!selectedTime) return;

            const [hour, minute] = selectedTime.split(":").map(Number);

            if (hour < 9 || (hour === 18 && minute > 0) || hour > 18) {
                alert("予約できる時間は 9:00 から 18:00 までです。");
                timeInput.value = ""; // 不正な入力をリセット
                    return;
            }
        // 10分単位かどうかを判定
                if (minute % 10 !== 0) {
                        alert("時間は10分単位で指定してください");
                        timeInput.value = "";
                }
        });
    });

    // ページ読み込み時に予約一覧を表示
    displayReservations();

    // 予約がない時の表示
    function displayReservations() {
        let reservationList = document.getElementById("reservationList");
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

        if (reservations.length === 0) {
            reservationList.innerHTML = "<p>現在、予約はありません。</p>";
            return;
        }

        reservationList.innerHTML = "<ul class='reservation-list'></ul>";

        reservations.forEach((reservation, index) => {
            let listItem = document.createElement("li");
            listItem.classList.add("reservation-item");
            listItem.innerHTML = `
                <span><strong>${reservation.name}</strong> - ${reservation.date} ${reservation.time} (${reservation.email})</span>
                <button class="delete-btn" onclick="deleteReservation(${index})">削除</button>
            `;
            reservationList.querySelector("ul").appendChild(listItem);
        });
    }
